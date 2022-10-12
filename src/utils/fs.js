import fs from 'fs/promises'

export const fsExists = async filePath => {
	return await fs.access(filePath).then(
		() => true,
		() => false
	)
}
