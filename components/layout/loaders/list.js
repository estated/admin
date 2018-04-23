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
    <rect x="0" y="10"  rx="3" ry="3" width="100%" height="6.4" />
    <rect x="0" y="30" rx="3" ry="3" width="100%" height="6.4" />
    <rect x="0" y="50" rx="3" ry="3" width="100%" height="6.4" />
    <rect x="0" y="70" rx="3" ry="3" width="100%" height="6.4" />
    <rect x="0" y="90" rx="3" ry="3" width="100%" height="6.4" />
    <rect x="0" y="110" rx="3" ry="3" width="100%" height="6.4" />
  </ContentLoader>
);

export default ListPreLoader;
