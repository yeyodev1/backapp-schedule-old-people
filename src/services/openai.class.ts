import OpenAI from 'openai';
import { EventEmitter } from 'node:events';
import { ChatCompletionMessageParam } from 'openai/resources';

const OPEN_AI_MODEL = process.env.OPEN_AI_MODEL ?? 'gpt-4o'; //gpt-4o

/**
 * Class
 */
class AIClass extends EventEmitter {
	private openai: OpenAI;
	constructor(apiKey: string) {
		super();
		this.openai = new OpenAI({ apiKey, timeout: 15 * 1000 });
		if (!apiKey || apiKey.length === 0) {
			throw new Error("OPENAI_KEY is missing");
		}
	}

  createChat = async (
		messages: ChatCompletionMessageParam[],
		model?: string,
		temperature = 0
	) => {
		try {
			const completion = await this.openai.chat.completions.create({
				model: model ?? OPEN_AI_MODEL,
				messages,
				temperature,
				max_tokens: 256,
				top_p: 0,
				frequency_penalty: 0,
				presence_penalty: 0,
			});
			this.emit("gas_token", {
				amount: (completion?.usage!.total_tokens ?? 0) + 10000,
			});
			return completion.choices[0].message.content;
		} catch (err) {
			console.error(err);
			return "ERROR";
		}
	};

	generateImage = async (prompt: string) => {
		try {
			const response = await this.openai.images.generate({
				prompt,
				model: 'dall-e-3',
				size: '1024x1024',
				n: 1
			});
			return response.data[0].url;
		} catch (err) {
			console.error(err);
			return "ERROR";
		}
	};
}

export default AIClass;