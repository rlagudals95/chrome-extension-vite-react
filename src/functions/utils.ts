export const isStrictEqual = (value1: any) => (value2: any) =>
  value1 === value2;
export const isNotStrictEqual = (value1: any) => (value2: any) =>
  value1 !== value2;

export const isIncludedIn = (array: Array<any>) => (item: any) =>
  array.includes(item);

export const stopPropagation = (e: Event) => e.stopPropagation();

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[<>:"|?*]/g, "");
};

export const unique = (values: Array<any>) => [...new Set(values)];

// for 크롬 익스텐션 콘솔 기능 
export const  bglog = function(obj: any) {
  if(chrome && chrome.runtime) {
    chrome.runtime.sendMessage({type: "bglog", obj: obj});
  }
}