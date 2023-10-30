import vituum from 'vituum'
import twig from '@vituum/vite-plugin-twig'

export default {
    base: "/Crisp/",
    plugins: [
        vituum(),
        twig({
            root: './src'
        })
    ]
}
