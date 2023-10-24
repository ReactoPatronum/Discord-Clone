// types.d.ts
declare namespace PrismaTypes {
  interface Profile {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
    password: string;
    servers: Server[];
    members: Member[];
    channels: Channel[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface Server {
    id: string;
    name: string;
    imageUrl: string;
    inviteCode: string;
    profileId: string;
    profile: Profile;
    members: Member[];
    channels: Channel[];
    createdAt: Date;
    updatedAt: Date;
  }

  enum MemberRole {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    GUEST = "GUEST",
  }

  interface Member {
    id: string;
    role: MemberRole;
    profileId: string;
    profile: Profile;
    serverId: string;
    server: Server;
    messages: Message[];
    directMessages: DirectMessage[];
    conversationsInitiated: Conversation[];
    conversationsReceived: Conversation[];
    createdAt: Date;
    updatedAt: Date;
  }

  enum ChannelType {
    TEXT = "TEXT",
    AUDIO = "AUDIO",
    VIDEO = "VIDEO",
  }

  interface Channel {
    id: string;
    name: string;
    type: ChannelType;
    profileId: string;
    profile: Profile;
    serverId: string;
    server: Server;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
  }

  interface Message {
    id: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    member: Member;
    channelId: string;
    channel: Channel;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Conversation {
    id: string;
    memberOneId: string;
    memberOne: Member;
    memberTwoId: string;
    memberTwo: Member;
    directMessages: DirectMessage[];
  }

  interface DirectMessage {
    id: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    member: Member;
    conversationId: string;
    conversation: Conversation;
    deleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
}

export = PrismaTypes;
