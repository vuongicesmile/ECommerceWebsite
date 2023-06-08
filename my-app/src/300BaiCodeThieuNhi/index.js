// bài 1 : two sum
// Input : nums = [2,7,11,15]
// target : 9
//=> output : [0,1]
const twoSumByLoop = (nums, target) => {
    //loop
    // loop + tong
    // O(N^2)
    // chạy qua n phần tử để tìm kiếm
    for (let i = 0; i < nums.length; i++) {
        for (let j = 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};
const twoSumByHasMap = (nums, target) => {
    // tạo 1 hasMap để lưu lại những gì bạn đã duyệt
    const hashMap = {};
    for (let i = 0; i < nums.length; i++) {
        // mình duyệt từ số 2 rồi , thì không tìm lại từ đầu nữa
        // lấy tới số 2
        //tìm trong has map nó có không 
        let num = nums[i];
        // 2 hasMap ={}
        // 7 hasMap = {2 : 0} return [1,0]
        //11 hasMap = {'2',0,'7': 1,'11': 2}
        if (hashMap[target - num] != undefined) {
            //9 - 7 
            return [i, hashMap(target - num)]
        }
        // has map mình chưa có gì thì không chạy vô trong
        hashMap[num] = i
    }
}
//---------------------------------------------------
// kiểm tra xem chuỗi có đóng mở hợp lý không 
// give a string s containing just the characters '(', ')','{','}'
//input s=()
//output = true
const isValid = (s) => {
    // những cái mở thì đưa những ngoặc mở vào 
    // những cái đóng thì đưa những ngoặc đóng ra
    // pop từ stack ra
    const stack = [];
    const match = {
        ')': '(',
        ']': '[',
        '}': '{'
    }
    for (const ch of s) {
        if (ch === '{' || ch === '[' || ch === '(') {
            stack.push(ch);
        } else {
            const top = stack.pop();
            if (match[ch] !== top) {
                return false;
            }
        }
        //đóng ngoặc
        // lấy số đó ra và so với những cái trong stack

    }
    return true;
}

// link list
//input : list1 = [1,2,4] list2 = [1,3,4]
// output : [1,1,2,3,4,4]
const megreTwoLists = (list1, list2) => {
    //xem list 1 và list 2
    // nếu list 1 < list 2 , point tới list 1 , else point tới list 2
    //const head = null;
    // dummy node
    const head = new ListNode(0, null);
    while (list1 && list2) {
        if (list1.val < list2.val) {
            head.next = list1;// tro head bang list 1
            list1 = list1.next;// dich chuyen list 1
        } else {
            head.next = list2;// tro head bang list 1
            list2 = list2.next;// dich chuyen list 1
        }
    }
    return head.next;
}
//regex thay thế các kí tự đặc biết , số 
const isValid1 = (s) => {
    const cleaned = s.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
}
// 
//input : s = "anagram", t = "nagaram"
//output: true
//o(nlogn)
const isAnagramBySplit = (s, t) => {
    const a = s.split('');
    a.sort();
    const b = t.split('');
    b.sort();
    return a.join('') == b.join('');
}
const isAnagramByHashMap = (s, t) => {
    const hashMap = {};
    for (const a of s) {
        hashMap[a] = (hashMap[a] || 0) + 1
        //{a: 3, n: 1, g: 1, r: 1, m: 1}
    }
    for (const b of t) {
        hashMap[b] = (hashMap[b] || 0) - 1
    }
    return Object.values(hashMap).every(character => character === 0)
}
// isAnagramByHashMap('anagram')

//Binary search
//o(log n) 64 phan tu chay 6 lan 2^6
//o(n) : 64 phan tu chay 64 lan
const searchBinary = (nums, target) => {
    let low = 0;
    let high = nums.length - 1;
    while (low <= high) {
        const pivot = Math.floor((high + low) / 2)
        const num = num[pivot]
        if (num === target) {
            return pivot;
        } else if (num < target) {
            low = pivot + 1;
        } else {
            high = pivot - 1;
        }
    }
    return -1
}
// Defanging an IP address
// a defaned ip address replace every period '.' with '(.)'
const defangingAddress = (add) => {
    return add.split('.').join('[.]')
}
// Tìm số bước chuyển một số về 0 

const numOfSteps = (num) => {
    let step = 0;
    while (num > 0) {
        num = num % 2 === 0 ? (num / 2) : (num - 1)
        step++;
    }
    return step
}
// 3. Tìm số lượng số nhỏ hơn 1 số trong mảng
// o(N^2)
//input : [8,1,2,2,3]
//output : [4,0,1,1,3]
const smallerNumbersThanCurrentByLoop = (nums) => {
    const result = []
    for (let i = 0; i < nums.length; i++) {
        let smaller = 0;
        for (let j = 0; j < nums.length; j++) {
            if (i > j) {
                smaller++;
            }
        }
        result.push(smaller);
    }
    return result;
}
//sort : onlogn
const smallerNumbersThanCurrentByHashMap = (num) => {
    num.sort((a, b) => Number(a) - Number(b));
    // có 2 trường hợp 2,2, giống nhau không dùng index được ta sẽ 
    // dùng hashmap để mình lưu
    //{'8' : 4, '1' : 0; '2' : 1, '3' : 3}
    const hashMap = {};
    for (let i = 0; i < num.length; i++) {
        const numItem = num[i];
        if (hashMap[numItem] === undefined) {
            hashMap[numItem] = i
        }
    }
    return num.map(num => hashMap[num])
}
// Running sum of 1 array
//input : nums = [1,2,3,4]
//output : [1,3,6,10]

const runningSum = (sum) => {
    const result = []
    for (let i = 0; i < sum.length; i++) {
        const num = sum[i]
        if (i === 0) {
            result.push(num)
        } else {
            result.push(num + result[i - 1])
        }
    }
    return result;
}
// richest customer weadth 
//input : account : [[1,2,3],[3,2,1]]
//output : 6

const maximumWeadth = (account) => {
    let max = 0;
    for (let i = 0; i < account.length; i++) {
        const sum = account[i].reduce((a, b) => a + b, 0)
        if (sum > max) {
            max = sum
        }
    }
    return max;
}