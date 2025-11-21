'use server';
import * as prettier from 'prettier/standalone';
import prettierPluginJava from 'prettier-plugin-java';
import { trpc } from '@/server/trpc/server';
import { Language, PlayDetails } from '@/server/trpc/types';

export type FormatRequest = {
  code: string;
  language: Language;
};

export type FormatResponse = {
  formattedCode?: string;
  error?: string;
};

export async function formatCodeAction({
  code,
  language,
}: FormatRequest): Promise<FormatResponse> {
  if (!code || !language) {
    return { error: 'Missing code or language' };
  }

  try {
    let formattedCode: string;

    switch (language) {
      case 'java':
        try {
          formattedCode = await prettier.format(code, {
            parser: 'java',
            plugins: [prettierPluginJava],
            tabWidth: 2,
            printWidth: 80,
            useTabs: false,
            bracketSameLine: true,
          });
        } catch {
          const lines = code.split(/\r?\n/);
          formattedCode = lines
            .map((line) => line.replace(/\s+$/, ''))
            .join('\n');
        }
        break;
      case 'cpp':
      case 'python': {
        // Prettier doesn't support C++ or Python well, so just clean whitespace and convert tabs to spaces
        const lines = code.split(/\r?\n/);
        formattedCode = lines
          .map((line) => line.replace(/\t/g, '  ').replace(/\s+$/, ''))
          .join('\n');
        break;
      }
      default:
        return { error: 'Unsupported language' };
    }

    return { formattedCode };
  } catch (error) {
    console.error('Format error:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to format code',
    };
  }
}

export async function createPlayCompletion({
  algoId,
  playDetails,
}: {
  algoId: string;
  playDetails: PlayDetails;
}) {
  try {
    await trpc.algo.createPlay({ algoId, playDetails });
    return { success: true };
  } catch (err) {
    console.error('Failed to send completion:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
