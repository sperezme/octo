/// <reference types="vite/client" />
import { expect, afterEach, beforeAll, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react';
import * as matchers from "@testing-library/jest-dom/matchers";

import '@testing-library/jest-dom'

global.ResizeObserver = require("resize-observer-polyfill");

expect.extend(matchers);

beforeAll(() => {});
afterEach(() => {
  cleanup;
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
});

afterAll(() => { })
