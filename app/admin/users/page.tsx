import { createClient } from '@/lib/supabase/server'
import RoleSelect from '@/components/RoleSelect'

export const dynamic = 'force-dynamic'

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-blue-950">User Management</h1>
      <p className="text-gray-600 mt-1">View and manage platform users.</p>

      <table className="w-full mt-6 text-sm border-t">
        <thead>
          <tr className="text-left text-gray-500 border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Country</th>
            <th className="py-2">Role</th>
            <th className="py-2">Last Login</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.full_name || '—'}</td>
              <td className="py-2">{u.email}</td>
              <td className="py-2">{u.country || '—'}</td>
              <td className="py-2">
                <RoleSelect userId={u.id} currentRole={u.role} />
              </td>
              <td className="py-2">
                {u.last_login
                  ? new Date(u.last_login).toLocaleString()
                  : 'Never'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {(!users || users.length === 0) && (
        <p className="text-gray-500 text-center mt-10">No users yet.</p>
      )}
    </div>
  )
}