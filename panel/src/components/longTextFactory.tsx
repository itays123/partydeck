export function createLongText(text: string) {
  return function Text() {
    return (
      <>
        {text.split('\n').map((txt, i) => (
          <p key={i}>{txt}</p>
        ))}
      </>
    );
  };
}
