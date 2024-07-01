import { User } from './user.entity.js';
const users = [new User('1', '1828347', 'Matt', 'Tuck', 'bfmv@gmail.com')];
export class UserRepository {
    findAll() {
        return users;
    }
    findOne(item) {
        return users.find((user) => user.id === item.id);
    }
    add(item) {
        users.push(item);
        return item;
    }
    update(item) {
        const userIdx = users.findIndex((user) => user.id === item.id);
        if (userIdx !== -1) {
            users[userIdx] = { ...users[userIdx], ...item };
        }
        return users[userIdx];
    }
    delete(item) {
        const userIdx = users.findIndex((user) => user.id === item.id);
        if (userIdx !== -1) {
            const deletedUsers = users[userIdx];
            users.splice(userIdx, 1);
            return deletedUsers;
        }
    }
}
//# sourceMappingURL=user.repository.js.map