export class Matrix {
    constructor(data) {
        this.proxy = new Proxy(data, {
            get(target, prop) {
                if (prop == 'rows') return target.length;
                if (prop == 'columns') return target[0].length;
                let [y, x] = prop.split(",");
                if (x == undefined) return Reflect.get(...arguments);
                return target[y]?.[x]
            },
            set(target, prop, value) {
                let [y, x] = prop.split(",");
                if (!target[y]) target[y] = [];
                target[y][x] = value;
                return true
            },
        });
        return this.proxy;
    }
}


export class Point {
    constructor(y, x) {
        if (arguments.length == 1 && typeof y == 'array') {
            this.x = y[1];
            this.y = y[0];
        } else {
            this.x = x;
            this.y = y;
        }
    }
    toString() {
        return `${this.y},${this.x}`;
    }
}
export const DIR = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
};
Object.freeze(DIR);