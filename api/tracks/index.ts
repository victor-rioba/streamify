import type { DefineMethods } from 'aspida';
import { Track } from './types';

export type Methods = DefineMethods<{
  get: {
    query?: {
      query?: string;
      limit?: number;
    };

    resBody: Track[];
  };

  post: {
    // reqFormat: FormData;

    reqBody: {
      url: string;
      title: string;
      artist?: string;
      artwork?: string;
    };

    resBody: Track;
  };
}>;
