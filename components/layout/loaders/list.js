import ContentLoader from "react-content-loader"

const ListPreLoader = props => (
  <ContentLoader
    height={340}
    stlye={{width: '100%'}}
    speed={4}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="30" />
    <rect x="0" y="40" rx="5" ry="5" width="100%" height="30" />
    <rect x="0" y="80" rx="5" ry="5" width="100%" height="30" />
    <rect x="0" y="120" rx="5" ry="5" width="100%" height="30" />
  </ContentLoader>
);

export default ListPreLoader;
