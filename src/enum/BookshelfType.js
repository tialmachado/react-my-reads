export const getAll = () => {
  return [
    { status: 'currentlyReading', label: 'Currently Reading' },
    { status: 'wantToRead', label: 'Want to Read' },
    { status: 'read', label: 'Read' }
  ];
};
