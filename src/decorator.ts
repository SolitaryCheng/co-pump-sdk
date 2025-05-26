export function memoize<Args extends any[]>(
  duration: number,
  computeKey = (...args: Args) => args[0],
) {
  return function <T>(
    _: any,
    _key: string,
    descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<T>>,
  ): TypedPropertyDescriptor<(...args: Args) => Promise<T>> | void {
    const originalMethod = descriptor.value!;
    let cachedData = new Map<string, T | undefined>();
    let cachedTime = Date.now();
    const isExpired = () => duration > 0 && cachedTime < Date.now();

    descriptor.value = async function (...args: Args) {
      const key = computeKey(...args);
      if (!cachedData.get(key) || isExpired()) {
        cachedTime = Date.now() + duration;
        cachedData.set(key, await originalMethod.apply(this, args));
      }
      return cachedData.get(key)!;
    };

    return descriptor;
  };
}
