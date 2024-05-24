import { FastifyRequest, FastifyReply } from 'fastify'

// Middleware to check API key. Currently disabled
export const apiKeyMiddleware = (
	request: FastifyRequest,
	reply: FastifyReply,
	done: (err?: Error) => void
) => {
	const apiKeyHeader = request.headers['apikey']
	const apiKeyEnv = process.env.API_KEY

	if (!apiKeyHeader || apiKeyHeader !== apiKeyEnv) {
		return reply.code(401).send({ error: 'Unauthorized' })
	}

	done()
}