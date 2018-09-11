const { GraphQLServer } = require('graphql-yoga')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MBMBaM_Eps');


var Episode = mongoose.model('Episode', {
    EpisodeTitle: String,
    EpisodeNumber:String,
    EpisodeDescription:String,
    Completed: String
},"Eps");

const typeDefs = `
  type Query {
    hello(name: String): String!
    episodes: [Episode]
  }
  type Episode{
      id: ID!
      EpisodeNumber:String!
      EpisodeTitle:String!
      EpisodeDescription:String
      Completed:String!
  }
  type Mutation{
      createEpisode(EpisodeNumber: String!,EpisodeTitle:String!,EpisodeDescription:String!): Episode
      updateEpisode(id:ID!,EpsiodeNumber:String,EpisodeTitle:String,EpisodeDescription:String,Completed:String): Boolean
      deleteEpisode(id:ID!):Boolean
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    episodes: () => Episode.find()
  },
  Mutation:{
      createEpisode: async (_, {EpisodeNumber}) => {
          const episode = new Episode({EpisodeNumber, EpisodeTitle, EpisodeDescription,Completed:0});
          await episode.save();
          return episode;
      },
      updateEpisode: async (_, {id, EpisodeTitle, EpisodeNumber, EpisodeDescription,Completed}) => {
         await Episode.findByIdAndUpdate(id, {EpisodeTitle, EpisodeNumber, EpisodeDescription,Completed})
        return true
      },
      deleteEpisode: async (_, {id}) => {
        await Episode.findByIdAndRemove(id)
       return true
     }
  }
}

const server = new GraphQLServer({ typeDefs, resolvers })
mongoose.connection.once('open', function() {
  // we're connected!
});
server.start(() => console.log('Server is running on localhost:4000'))