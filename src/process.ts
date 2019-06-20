export class px2vwProcess {

    constructor(private cog: any) { }

    private rePx: RegExp = /([\d.]+)p(x)?/;

    private rePxAll: RegExp = /([\d.]+)px/g;

    /**
     * 换px转换成vw
     * 
     * @private
     * @param {string} pxStr 
     */
    private px2Vw(pxStr: string) {
        const px = parseFloat(pxStr);
        let vwValue: number | string = +(px / this.cog.baseWidth * 100).toFixed(this.cog.fixedDigits);
        if (this.cog.autoRemovePrefixZero) {
            if (vwValue.toString().startsWith('0.'))
                vwValue = vwValue.toString().substring(1);
        }
        return { px: pxStr, pxValue: px, vwValue, vw: vwValue + 'vw'  };
    }

    /**
     * px转vw
     * 
     * @param {string} text 需要转换文本，例如：10px
     * @return {Object} { px: '10px', pxValue: 10, vw: '1vw', vwValue: 1 }
     */
    convert(text: string) {
        let match = text.match(this.rePx);
        if (!match) return null;

        return this.px2Vw(match[1]);
    }

    /** 批量转换 */
    convertAll(code: string): string {
        if (!code) return code;

        return code.replace(this.rePxAll, (word: string) => {
            const res = this.px2Vw(word);
            if (res) return res.vw;
            return word;
        });

    }
}