<script context="module">
	import ApolloClient, { gql } from 'apollo-boost';

	const postsQuery = gql`
		query PostsList {
			posts {
				id
				title
				slug
			}
		}
	`;

	export async function preload({ params, query }) {
		const client = new ApolloClient({
			uri: 'http://localhost:1337/graphql',
			fetch: this.fetch
		});
		const { data } = await client.query({ query: postsQuery });
		return {
			posts: data.posts
		};
	}
</script>

<script>
	export let posts;
</script>

<style>
	ul {
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<li><a rel="prefetch" href="blog/{post.slug}">{post.title}</a></li>
	{/each}
</ul>
