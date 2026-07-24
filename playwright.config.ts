
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout: 500 * 1000,
  expect: {
      timeout: 5000,
    },
  reporter: 'html',
  retries: 3,

  projects: [
    {
      name: 'chromium',
      use: { 
              browserName: 'chromium',
              headless: true,
              trace: 'retain-on-failure',
              screenshot: 'only-on-failure',

           },
     },
  ],

});

