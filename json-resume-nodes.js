const createNodeHelpers = require('gatsby-node-helpers').default;

const {createNodeFactory} = createNodeHelpers({
    typePrefix: 'Json'
});

const RESUME = 'Resume';

const ResumeNode = createNodeFactory(RESUME);

module.exports = ResumeNode;
