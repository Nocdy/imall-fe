const storage = {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    const value: string | null = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  },
};

export default storage;
