import type { NextApiRequest, NextApiResponse } from 'next';
import * as prettier from 'prettier/standalone';
import * as prettierPluginTypescript from 'prettier/parser-typescript';
import * as prettierPluginBabel from 'prettier/parser-babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginJava from 'prettier-plugin-java';

type FormatRequest = {
  code: string;
  language: 'python' | 'cpp' | 'java' | 'typescript' | 'javascript';
};

type FormatResponse = {
  formattedCode?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormatResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language } = req.body as FormatRequest;

  if (!code || !language) {
    return res.status(400).json({ error: 'Missing code or language' });
  }

  try {
    let formattedCode: string;

    switch (language) {
      case 'java':
        formattedCode = await prettier.format(code, {
          parser: 'java',
          plugins: [prettierPluginJava],
          tabWidth: 2,
          printWidth: 80,
        });
        break;

      case 'cpp':
      case 'python':
        // Prettier doesn't support C++ or Python well, so just clean whitespace
        const lines = code.split(/\r?\n/);
        formattedCode = lines
          .map((line) => line.replace(/\s+$/, ''))
          .join('\n');
        break;

      case 'typescript':
      case 'javascript':
        formattedCode = await prettier.format(code, {
          parser: 'babel',
          plugins: [
            prettierPluginTypescript,
            prettierPluginBabel,
            prettierPluginEstree,
          ],
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
          tabWidth: 2,
        });
        break;

      default:
        return res.status(400).json({ error: 'Unsupported language' });
    }

    return res.status(200).json({ formattedCode });
  } catch (error) {
    console.error('Format error:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Failed to format code',
    });
  }
}
