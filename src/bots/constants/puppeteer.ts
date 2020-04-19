import { BotHelper } from '../helpers/BotHelper';

export const devOptions = {
  executablePath: 'google-chrome-unstable',
  headless: true,
  args: ['--no-sandbox',
    '--disable-setuid-sandbox',
    '--no-zygote',
    '--disable-dev-shm-usage'
  ]
}

export const prodOptions = {
  executablePath: 'google-chrome-unstable',
  ignoreHTTPSErrors: true,
  headless: true,
  args: ['--no-sandbox',
    '--disable-setuid-sandbox',
    '--no-zygote',
    '--disable-infobars',
    '--window-position=0,0',
    '--disable-dev-shm-usage',
    '--ignore-certificate-errors',
    '--ignore-certificate-errors-spki-list',
    `--proxy-server=http://${BotHelper.chosenProxy.ip}:${BotHelper.chosenProxy.port}`,
    `'--user-agent="${BotHelper.userAgent}"'`]
}