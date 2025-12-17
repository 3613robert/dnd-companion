let nextId = 1;

export class Dice {
  id: number;
  constructor(
    public name: string,
    public value: string,   
) {
      this.id = nextId++;
    }
}