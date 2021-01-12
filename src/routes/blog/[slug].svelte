<script context="module">
	import ApolloClient, { gql } from 'apollo-boost';

	const postQuery = gql`
		query Post($slug: String!) {
			posts: posts(where: { slug: $slug }) {
				id
				title
				content
				image {
					url
					alternativeText
				}
				author {
					firstname
					lastname
				}
			}
		}
	`;

	export async function preload({ params }) {
		const { slug } = params;

		const client = new ApolloClient({
			uri: 'http://localhost:1337/graphql',
			fetch: this.fetch
		});
		try {
			const { data } = await client.query({
				query: postQuery,
				variables: { slug }
			});
			return {
				posts: data.posts
			};
		} catch (error) {
			// console.dir(error);
		}
	}
</script>

<script>
	export let posts;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	.content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	}
</style>

<svelte:head>
	<title>{posts[0].title}</title>
</svelte:head>

<div class="content">
	{#each posts as post}
		<h1>{post.title}</h1>
		{@html post.content}
	{/each}
</div>
