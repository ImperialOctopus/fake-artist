export class Prompt {
  constructor(c: string, w: string) {
    this.category = c;
    this.word = w;
  }
  word: string;
  category: string;

  static wordlistToPrompt(category: string, wordlist: Array<string>): Array<Prompt> {
    return wordlist.map((element: string) => {
      return new Prompt(category, element);
    });
  }
}
