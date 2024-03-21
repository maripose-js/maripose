export const HomePage = ({ meta }: { meta: any }) => {
  return (
    <>
      {meta.features.map((feature: any) => (
        <div>
          <h1>{feature.title}</h1>
          <p>{feature.details}</p>
        </div>
      ))}
    </>
  );
};
