export default {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}], // 누가 이 포스트를 작성했는지 알고 있는 유저타입 갖고있음
    },
    {
      title: 'Photo', // 작성하는데 사용한 이미지
      name: 'photo',
      type: 'image',
    },
    {
      title: 'Likes', // 이걸 좋아한 사용자들의 배열
      name: 'likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}], // 이 포스트에 좋아요를 누른 사람의 레퍼런스를 참조하여 배열로 갖고 있을 것임
        },
      ],
      validation: (Rule) => Rule.unique(), // 당연히 유니크해야함
    },
    {
      title: 'Comments', // 코멘트에 관한 배열
      name: 'comments',
      type: 'array',
      of: [
        {
          title: 'Comment', // 문서에 관한 배열 (사용자와 코멘트 갖고있음)
          name: 'comment',
          type: 'document',
          fields: [
            {
              title: 'Author',
              name: 'author',
              type: 'reference',
              to: [{type: 'user'}],
            },
            {
              title: 'Comment',
              name: 'comment',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      // comments 배열에 있는 0번째 인덱스에있는 아이템의 comment key를 보여줌
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo',
    },
    prepare(selection) {
      const {title, authorName, authorUsername, media} = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media,
      }
    },
  },
}
