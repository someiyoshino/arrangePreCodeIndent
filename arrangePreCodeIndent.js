"use strict";
function arrangePreCodeIndent() {
    // pageのcodeタグを全て拾う。
    const codes = document.querySelectorAll("code");

    // 拾ったcodeタグすべてに対して処置する。
    codes.forEach(function (code) {
        // 修正した新しい文字列を格納する変数。
        let new_line = [];

        // 改行でスライス。
        let codeSplit = code.innerHTML.split(/\r\n|\n/);

        // 全行で一番小さいインデントの数を返します。
        let min_indent = (function () {
            // 番兵的な数値。
            let min_num = 99;
            for (let i = 0; i < codeSplit.length; i++) {
                // serach()...マッチしたらindex、マッチしなかったら-1を返す。
                // \S...空白文字以外全てにマッチ
                // codeタグの中には改行行、空行があると想定している。
                // 先頭は改行、末尾はインデント分と改行であることがおおい。
                let tmp = codeSplit[i].search(/\S/);
                if (0 <= tmp && tmp < min_num) {
                    min_num = tmp;
                }
            }
            return min_num;
        })();

        //先頭からインデント分を削除する。
        let cnt = 0;
        for (let i = 0; i < codeSplit.length; i++) {
            if (0 <= codeSplit[i].search(/\S/)) {
                new_line[cnt++] = codeSplit[i].substring(min_indent);
            } else {
                // 行に文字が無い場合で、最初と最後の行の場合はカットする
                if (i == 0 && i == codeSplit.length - 1) {
                    new_line[cnt++] = codeSplit[i];
                }
            }
        }

        code.innerHTML = new_line.join("\n");
    });
}

// loadが終わってから実行します。
// highlight.jsなどは私より後に実行してくださいね。
// window.addEventListener("load", arrangePreCodeIndent);
