<script>
import Nav from '$lib/components/SiteNav.svelte';

const footerLinks = [
	{
		text: "About",
		path: "/about"
	},
	{
		text: "Legal",
		path: "/legal"
	},
	{
		text: "Bug Report",
		path: "/report"
	},
	{
		text: "Donate",
		path: "/donate"
	},
	{
		text: "Contact",
		path: "/contact"
	},
	{
		text: "Contribute",
		path: "/contrib"
	},
]

let { children } = $props();
</script>

<Nav />
{@render children()}

<footer class="gap-4 flex bg-base-100/50 backdrop-blur border-t border-white/5 px-4 py-1.5 text-[11px] uppercase tracking-widest opacity-40 flex justify-start items-center">
	{#each footerLinks as link}
		<span><a href={link.path}>{link.text}</a></span>
	{/each}
</footer>
