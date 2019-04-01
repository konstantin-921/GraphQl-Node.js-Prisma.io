const { GraphQLServer } = require('graphql-yoga')

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },
  {
    id: 'link-1',
    url: 'www.howtographql1.com',
    description: 'Fullstack tutorial1 for GraphQL'
  },
]

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find((link) => {
        return link.id === args.id;
      });
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
       id: `link-${idCount++}`,
       description: args.description,
       url: args.url,
     }
     links.push(link)
     return link;
    },
    updateLink: (parent, args) => {
     let linkResponse;
     links.forEach(link => {
       if(link.id === args.id) {
         link.url = args.url;
         link.description = args.description;
         linkResponse = link;
       }
     })
     return linkResponse;
    },
    deleteLink: (parent, args) => {
      let deleteLink;
      links = links.filter(link => {
        deleteLink = link.id === args.id ? link : null;
        return link.id !== args.id;
      })
      return deleteLink;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))