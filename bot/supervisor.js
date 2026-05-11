import { spawn } from 'node:child_process';

let restartCount = 0;
let child = null;
let stopping = false;

function startBot() {
  child = spawn(process.execPath, ['bot/index.js'], {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('exit', (code, signal) => {
    if (stopping) {
      return;
    }

    restartCount += 1;
    const delay = Math.min(30000, 2000 + restartCount * 1000);
    console.error(
      `Bot to'xtadi (code=${code ?? 'null'}, signal=${signal ?? 'null'}). ${delay}ms dan keyin qayta ishga tushadi.`,
    );
    setTimeout(startBot, delay);
  });
}

function stopBot(signal) {
  stopping = true;
  if (child) {
    child.kill(signal);
  }
  process.exit(0);
}

process.on('SIGINT', () => stopBot('SIGINT'));
process.on('SIGTERM', () => stopBot('SIGTERM'));

console.log('HackPro bot supervisor ishga tushdi.');
startBot();
