const db = require('../config/db');

exports.getRooms = async () => {
  return await db('rooms').select('*');
};

exports.getRoomMessages = async (roomId) => {
  return await db('messages')
    .join('users', 'messages.user_id', '=', 'users.id')
    .where({ room_id: roomId })
    .select(
      'messages.id',
      'messages.content',
      'messages.created_at',
      'users.name as userName',
      'users.id as userId'
    )
    .orderBy('messages.created_at', 'desc')
    .limit(50);
};

exports.saveMessage = async (roomId, userId, content) => {
  const [newMessage] = await db('messages')
    .insert({
      room_id: roomId,
      user_id: userId,
      content
    })
    .returning('*');
  
  // Fetch the message with user name for real-time emission
  const messageWithUser = await db('messages')
    .join('users', 'messages.user_id', '=', 'users.id')
    .where('messages.id', newMessage.id)
    .select(
      'messages.id',
      'messages.content',
      'messages.created_at',
      'messages.room_id',
      'users.name as userName',
      'users.id as userId'
    )
    .first();

  return messageWithUser;
};
