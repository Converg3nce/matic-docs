Matic Network now has a integration live with [MóiBit](https://www.moibit.io/). MóiBit is a personal decentralized secure storage network with the power of immutability and provenance of blockchain systems.

Now you can integrate your DApp with MóiBit to allow authenticated MoiBit users to upload their files to MoiBit and store the corresponding hashes of the files on Matic Network for provenance purposes. 

A sample DApp that showcases a demo integration with MoiBit can be found here - https://github.com/moibit/Moibit-Sample-DApp/tree/matic-dapp. It also allows users to view and list the uploaded files.

The sample DApp also allows users to view the file only if off-chain hash of the file matches with on-chain hash, and wherein the hashes do not match, acknowledge that file change was not recorded on Matic network.

You can use this pattern to design various kinds of applications such as personal file storage apps a la Dropbox or store files for in-app actions, etc.