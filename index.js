const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  let t = parseInt(input);
  let i = 0;
  while (i < t) {
    rl.on("line", (input) => {
      let n = parseInt(input);
      let steps = 0;
      while (n > 0) {
        let digit = n % 10;
        n = Math.floor(n / 10);
        steps += digit;
      }
      console.log(steps);
      i++;
    });
  }
});

// ******************************************************************** //

// ? Knock down

function minShots(a) {
  let n = a.length;
  let dp = new Array(n + 1).fill(null).map(() => new Array(1 << n).fill(0));
  let INF = Number.MAX_VALUE;

  // Initialization
  for (let i = 1; i <= n; i++) {
    dp[i].fill(INF);
    dp[i][0] = 0;
  }

  // Dynamic Programming
  for (let i = 1; i <= n; i++) {
    for (let mask = 1; mask < 1 << n; mask++) {
      for (let j = 0; j < n; j++) {
        if ((mask & (1 << j)) == 0) continue; // j-th can has not been knocked down yet
        let prevMask = mask ^ (1 << j);
        let minCost = INF;
        for (let k = 0; k < n; k++) {
          if ((prevMask & (1 << k)) == 0) continue; // k-th can has already been knocked down
          let cost = dp[i - 1][prevMask ^ (1 << k)] + (a[i - 1] - k);
          minCost = Math.min(minCost, cost);
        }
        dp[i][mask] = Math.min(dp[i][mask], minCost);
      }
    }
  }

  // Final answer
  return dp[n][(1 << n) - 1];
}

// *************************** //

function CowsAndBulls(n, secret, guess) {
  let obj = {};
  let A = 0;
  let B = 0;

  for (let i = 0; i < n; i++) {
    let char = secret[i];

    if (obj[char]) {
      obj[char] = obj[char] + 1;
    } else {
      obj[char] = 1;
    }
  }

  for (let i = 0; i < n; i++) {
    let char = guess[i];

    if (obj[char]) {
      A = A + 1;
      obj[char] = obj[char] - 1;
    }
    if (secret[i] == guess[i]) {
      B = B + 1;
    }
  }
  console.log(B + "A" + (A - B) + "B");
}

function runProgram(input) {
  //Input Taking Here

  input = input.trim().split("\n");
  var tc = +input[0];
  let line = 1;

  for (let i = 0; i < tc; i++) {
    var n = +input[line].trim();
    line++;
    var secret = input[line];
    line++;
    var guess = input[line];
    line++;
    //console.log(n,secret,guess);
    CowsAndBulls(n, secret, guess);
  }
}
if (process.env.USER === "") {
  runProgram("");
} else {
  process.stdin.resume();
  process.stdin.setEncoding("ascii");
  let read = "";
  process.stdin.on("data", function (input) {
    read += input;
  });
  process.stdin.on("end", function () {
    read = read.replace(/\n$/, "");
    read = read.replace(/\n$/, "");
    runProgram(read);
  });
  process.on("SIGINT", function () {
    read = read.replace(/\n$/, "");
    runProgram(read);
    process.exit(0);
  });
}
