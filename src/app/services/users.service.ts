export class UsersService {
  private users = [
    {
      username: 'Nicolas Miranda',
      rut: '17946099-8',
      email: 'npmirandac@gmail.com',
    },
    {
      username: 'Nora Heuser',
      rut: '17385131-6',
      email: 'cn.heuser@gmail.com',
    },
  ];
  agregarUsuario(username: string, rut: string, email: string) {
    this.users.push({ username, rut, email });
  }
  obtenerUsuarios() {
    return [...this.users];
  }
}
