export function addArrays(arr1: number[], arr2: number[]): number[] {
  const maxLength = Math.max(arr1.length, arr2.length);

  return Array.from(
    { length: maxLength },
    (_, i) => (arr1[i] || 0) + (arr2[i] || 0)
  );
}
