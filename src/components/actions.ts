import * as prettier from 'prettier/standalone';
import * as prettierPluginTypescript from 'prettier/parser-typescript';
import * as prettierPluginBabel from 'prettier/parser-babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import prettierPluginJava from 'prettier-plugin-java';

export type FormatRequest = {
  code: string;
  language: 'python' | 'cpp' | 'java' | 'typescript' | 'javascript';
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
        } catch (javaFormatError) {
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
