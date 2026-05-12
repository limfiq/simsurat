const db = require('./config/database');
const Role = require('./models/Role');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seed = async () => {
    try {
        await db.authenticate();
        console.log('Database connected...');

        // Ensure tables exist
        await db.sync();

        // 1. Create Roles
        const roleData = [
            { role_name: 'Admin' },
            { role_name: 'Petugas' },
            { role_name: 'Pimpinan' },
            { role_name: 'User' }
        ];

        for (const r of roleData) {
            try {
                const [role, created] = await Role.findOrCreate({ 
                    where: { role_name: r.role_name }, 
                    defaults: r 
                });
                if (created) {
                    console.log(`✓ Role created: ${r.role_name}`);
                }
            } catch (roleError) {
                console.error(`✗ Error with role ${r.role_name}:`, roleError.message);
            }
        }
        console.log('Roles processed.');

        // 2. Create Users
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash('123456', salt);

        // Get role IDs dynamically
        const adminRole = await Role.findOne({ where: { role_name: 'Admin' } });
        const petugasRole = await Role.findOne({ where: { role_name: 'Petugas' } });
        const pimpinanRole = await Role.findOne({ where: { role_name: 'Pimpinan' } });

        const usersData = [
            {
                nama: 'Administrator',
                email: 'admin@simsurat.com',
                password: passwordHash,
                role_id: adminRole?.id || 1
            },
            {
                nama: 'Staff Surat',
                email: 'staff@simsurat.com',
                password: passwordHash,
                role_id: petugasRole?.id || 2
            },
            {
                nama: 'Bapak Pimpinan',
                email: 'pimpinan@simsurat.com',
                password: passwordHash,
                role_id: pimpinanRole?.id || 3
            }
        ];

        for (const u of usersData) {
            try {
                let user = await User.findOne({ where: { email: u.email } });
                if (!user) {
                    user = await User.create(u);
                    console.log(`✓ User created: ${u.email}`);
                } else {
                    user.password = u.password;
                    user.role_id = u.role_id;
                    await user.save();
                    console.log(`✓ User updated (password reset): ${u.email}`);
                }
            } catch (userError) {
                console.error(`✗ Error with user ${u.email}:`, userError.message);
            }
        }

        // Verify users were created
        const allUsers = await User.findAll({ include: Role });
        console.log(`\nTotal users in database: ${allUsers.length}`);
        allUsers.forEach(user => {
            console.log(`  - ${user.email} (${user.nama}) - Role: ${user.Role?.role_name || 'N/A'}`);
        });

        console.log('\n✓ Seeding completed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};

seed();
