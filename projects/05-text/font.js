class LetterFont {
  constructor(text, x, y, fontOptions) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = fontOptions.font;
    this.fontSize = fontOptions.fontSize;

    textFont(this.font);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER);
    this.pointsText = this.text.split("").map((letter, i) => ({
      points: this.font.textToPoints(
        letter,
        this.x * i,
        this.y,
        this.fontSize,
        {
          sampleFactor: 0.2,
        }
      ),
      letter,
    }));
  }

  draw() {
    push();
    fill(255);
    textAlign(CENTER, CENTER);

    this.pointsText.forEach(({ points, letter }) => {
      let letterIndex = 0;
      stroke(255);
      points.reverse().forEach((point) => {
        const x = point.x + this.fontSize / 2;
        const y = point.y + this.fontSize / 2;
        const l = this.text[letterIndex];

        textSize(this.fontSize * 0.08);
        text(l, x, y);

        letterIndex = letterIndex < this.text.length ? ++letterIndex : 0;
      });
    });
    pop();
  }
}

class MagazineFont {
  constructor(text, x, y, fontOptions) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = fontOptions.font;
    this.fontSize = fontOptions.fontSize;
  }

  draw() {
    textAlign(CENTER, CENTER);
    textFont(this.font);
    textSize(this.fontSize);
    this.text.split("").forEach((l, i) => {
      const x = this.x * (i + 1);
      const y = this.y;
      const bgColor = random(["#e05a32", "#c8e8f5", "#9f134e"]);

      fill(bgColor);

      rect(
        x - this.fontSize / 2,
        y - this.fontSize / 2.5,
        this.fontSize,
        this.fontSize
      );

      fill(invertColor(bgColor, true));
      text(l, x, y);
    });
  }
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join("0");
  return (zeros + str).slice(-len);
}

function invertColor(hex, bw) {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);
  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
  }
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  return "#" + String(r) + padZero(g) + padZero(b);
}
