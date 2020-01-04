const CommentController = require('../controller/comment.controller');

module.exports = {
  name: 'comment-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'POST',
        path: '/get',
        options: {
          auth: false,
          description: 'Get user gift comment',
          tags: ['api', 'Comment']
        },
        handler: getUserGiftComment
      },
      {
        method: 'GET',
        path: '/get/all',
        options: {
          auth: false,
          description: 'Get all user comment',
          tags: ['api', 'Comment']
        },
        handler: getAllUserComment
      },
      {
        method: 'POST',
        path: '/get/dinilai',
        options: {
          auth: false,
          description: 'Get all user get comment',
          tags: ['api', 'Comment']
        },
        handler: getAllUserGetComment
      },
      {
        method: 'PUT',
        path: '/put',
        options: {
          auth: false,
          description: 'Update comment',
          tags: ['api', 'Comment']
        },
        handler: updateComment
      },
      {
        method: 'DELETE',
        path: '/delete',
        options: {
          auth: false,
          description: 'Delete comment',
          tags: ['api', 'Comment']
        },
        handler: deleteComment
      },
      {
        method: 'POST',
        path: '/post/admin/createcomment',
        options: {
          auth: false,
          description: 'Create comment assessment from admin',
          tags: ['api', 'Comment']
        },
        handler: postCommentAssessment
      }
    ]);
  }
};

const getUserGiftComment = async (request, h) => {
  try {
    const comment = await CommentController.getUserGiftComment(
      request.payload.userGiftComment
    );
    return h.response(comment);
  } catch (error) {
    return error;
  }
};

const getAllUserComment = async (request, h) => {
  try {
    const comment = await CommentController.getAllUserComment();
    return h.response(comment);
  } catch (error) {
    return error;
  }
};

const getAllUserGetComment = async (request, h) => {
  try {
    const comment = await CommentController.getAllUserGetComment(
      request.payload.userGetComment
    );
    return h.response(comment);
  } catch (error) {
    return error;
  }
};

const updateComment = async (request, h) => {
  try {
    const comment = await CommentController.updateComment(request.payload);
    return h.response(comment);
  } catch (error) {
    return error;
  }
};

const deleteComment = async (request, h) => {
  try {
    const comment = await CommentController.deleteComment(request.payload);
    return h.response(comment);
  } catch (error) {
    return error;
  }
};

const postCommentAssessment = async (request, h) => {
  try {
    const comment = await CommentController.postCommentAssessment(
      request.payload
    );
    return h.response(comment);
  } catch (error) {
    return error;
  }
};
