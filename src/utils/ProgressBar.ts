import { bgWhite } from "chalk";

export default class ProgressBar {
  private total: number;
  private current: number;
  private bar_length: number;

  constructor() {
    this.total = 0;
    this.current = 0;
    this.bar_length = process.stdout.columns - 30;
  }

  init(total: number): void {
    this.total = total;
    this.current = 0;
    this.update(this.current);
  }

  update(current: number): void {
    this.current = current;
    const current_progress = this.current / this.total;
    this.draw(current_progress);
  }

  draw(current_progress: number): void {
    const filled_bar_length = (current_progress * this.bar_length).toFixed(0);
    const empty_bar_length = this.bar_length - parseInt(filled_bar_length);

    const filled_bar = this.get_bar(parseInt(filled_bar_length), " ", bgWhite);
    const empty_bar = this.get_bar(empty_bar_length, "-");
    const percentage_progress = (current_progress * 100).toFixed(2);

    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
      `Current progress: [${filled_bar}${empty_bar}] | ${percentage_progress}%`
    );
  }

  get_bar(
    length: number,
    char: string,
    color: (str: string) => string = (a) => a
  ): string {
    let str = "";
    for (let i = 0; i < length; i++) {
      str += char;
    }
    return color(str);
  }
}
