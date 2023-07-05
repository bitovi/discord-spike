export interface Message {
    id:               string;
    type:             number;
    content:          string;
    channel_id:       string;
    author:           Author;
    attachments:      any[];
    embeds:           any[];
    mentions:         any[];
    mention_roles:    any[];
    pinned:           boolean;
    mention_everyone: boolean;
    tts:              boolean;
    timestamp:        Date;
    edited_timestamp: null;
    flags:            number;
    components:       any[];
    position:         number;
}

export interface Author {
    id:                string;
    username:          string;
    global_name:       string;
    avatar:            string;
    discriminator:     string;
    public_flags:      number;
    avatar_decoration: null;
}
