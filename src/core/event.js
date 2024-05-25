export async function onDomContentLoaded(callback) {
  document.addEventListener("DOMContentLoaded", callback);
}

export const dispatchEvents = (target, ...eventNames) => {
  for (const eventName of eventNames) {
    const event = new Event(eventName, { bubbles: true });
    target.dispatchEvent(event);
  }
};
