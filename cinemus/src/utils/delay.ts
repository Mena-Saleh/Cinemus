// Simulates network delay (for testing loaders and skeletons)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default delay;
