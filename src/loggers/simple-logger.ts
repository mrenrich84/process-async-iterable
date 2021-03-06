export const simpleLogger = <TPayload>(el: TPayload) => {
  let payload;
  if (typeof el === "string") {
    payload = el;
  } else {
    payload = JSON.stringify(el, null, 4);
  }
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} --> ${payload}`);
};
