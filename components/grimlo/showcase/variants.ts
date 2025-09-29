import { Variants } from "framer-motion"


export const ACCENT = "#20165a"


export const splitWordVariants: Variants = {
hidden: { y: "100%", opacity: 0 },
show: (i: number) => ({
y: "0%",
opacity: 1,
transition: { delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
}),
}


export const pillVariants: Variants = {
hidden: { opacity: 0, y: 8 },
show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.35 } }),
}


export const cardVariants: Variants = {
hidden: { opacity: 0, y: 24 },
show: (i: number) => ({
opacity: 1,
y: 0,
transition: { delay: 0.1 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
}),
}


export const uspVariants: Variants = {
hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
}