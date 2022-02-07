import logger from 'pino'; // logging package
import dayjs from 'dayjs'; // timestamp formatting

const log = logger({
  prettyPrint: true,
  base: {
    pid: false
  },
  timestamp: () => `,"time":"${dayjs().format()}`,
});

export default log;
