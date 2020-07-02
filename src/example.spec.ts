class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    console.log(`${name} is now friend`);
  }
}

describe('Friends list', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });
  it('adds friend to the list', () => {
    friendsList.addFriend('Me');
    expect(friendsList.friends.length).toEqual(1);
  });
  it('announces friendship', () => {
    friendsList.announceFriendship = jest.fn();
    friendsList.addFriend('Me');
    expect(friendsList.announceFriendship).toHaveBeenCalled();
  });
});

// describe('my test', () => {
//   it('returns true', () => {
//     expect(true).toEqual(true)
//   })
// })
